import * as Z from "zod";
import * as React from "react";
import * as lib from "@/lib/api/auth";
import * as UI from "@nextui-org/react";
import * as Schema from "@/lib/schema/identity/signup";

import LoadingSpinner from "./spinner";
import PrivacyPolicy from "./legal-agreement/privacy-policy";
import TermsConditions from "./legal-agreement/terms-condition";

import { toast } from "sonner";
import { MyInput } from "./input";
import { MethodOption } from "@/types/identities";
import { setTokenSession } from "@/lib/session/token";
import { useGlobalContext } from "@/context/store/global";
import { useAuthFormContext } from "@/context/store/auth-form-store";

export function AuthForm(props: AuthFormProps) {
  const { data, setData } = useAuthFormContext();
  const { data: globalData, setData: setGlobalData } = useGlobalContext();
  const [isOnSubmit, setIsOnSubmit] = React.useState(false);
  const [inputForm, setInputForm] = React.useState<AuthInputForm>(
    {} as AuthInputForm
  );

  const {
    isOpen: isOpenTerms,
    onOpen: onOpenTerms,
    onOpenChange: onOpenChangeTerms,
  } = UI.useDisclosure();

  const {
    isOpen: isOpenPrivacy,
    onOpen: onOpenPrivacy,
    onOpenChange: onOpenChangePrivacy,
  } = UI.useDisclosure();

  const csrfToken = async () => {
    try {
      const response = await lib.getCSRFToken();

      if (!response.ok) {
        throw new Error("Failed while request the CSRF Token");
      }

      const { data: csrfData } = await response.json();

      if (!csrfData) {
        throw new Error("Failed to get CSRF Token");
      }

      setData({ ...data, csrf: csrfData });
      setGlobalData({
        ...globalData,
        tokens: {
          ...globalData.tokens,
          csrf: csrfData,
        },
      });
    } catch (error) {
      toast.error("Something gone wrong!", {
        position: "top-center",
        description: "Server Busy",
      });
    }
  };

  React.useEffect(() => {
    csrfToken();
  }, []);

  async function clearInputForm() {
    setInputForm({
      traitsValue: "",
      traitsType: "",
      password: "",
    });
  }

  async function validateTraits() {
    let data: unknown;

    if (props.email) {
      const parse = Schema.email.safeParse(inputForm.traitsValue);

      if (parse.success === true) {
        // parse as email
        setInputForm({ ...inputForm, traitsType: "email" });
        return parse;
      }

      // failed to parse as email
      data = parse.error;
    }

    if (props.username) {
      const parse = Schema.username.safeParse(inputForm.traitsValue);

      if (parse.success === true) {
        // parse as username
        setInputForm({ ...inputForm, traitsType: "username" });
        return parse;
      }

      // failed to parse as username
      data = parse.error;
    }

    if (props.phone_number) {
      const parse = Schema.phone.safeParse(inputForm.traitsValue);

      if (parse.success === true) {
        // parse as phone
        setInputForm({ ...inputForm, traitsType: "phone_number" });
        return parse;
      }

      // failed to parse as phone
      data = parse.error;
    }

    return data;
  }

  async function validatePassword() {
    const parse = Schema.password.safeParse(inputForm.password);

    if (parse.success === true) {
      // parse as medium password

      // continue to parse as strong password
      const strongParse = Schema.strongPwd.safeParse(inputForm.password);

      if (strongParse.success === true) {
        // parse as strong password
        setData({ ...data, method: "password" });
        return strongParse;
      }

      return strongParse.error;
    } else {
      // parsed as medium password
      return parse.error;
    }
  }

  async function preSubmit(): Promise<boolean> {
    const parseInputTraits = await validateTraits();
    const parseInputPassword = !props.isValidatePassword
      ? null
      : await validatePassword();

    if (parseInputTraits instanceof Z.ZodError) {
      const traitsEl = document.querySelector(
        'input[name="traits"]'
      ) as HTMLInputElement;

      toast.warning("Validation fields failed", {
        description: parseInputTraits.errors[0].message,
        position: "top-center",
      });

      traitsEl.focus();
      return false;
    }

    if (parseInputPassword instanceof Z.ZodError) {
      const passwordEl = document.querySelector(
        'input[name="password"]'
      ) as HTMLInputElement;
      toast.warning("Validation fields failed", {
        description: parseInputPassword.errors[0].message,
        position: "top-center",
      });
      passwordEl.focus();
      return false;
    }

    return true;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const { method = "password" } = props;
    const { csrf } = globalData?.tokens || {};
    const { traitsType = "email", traitsValue, password } = inputForm;
    const traits = {
      [traitsType]: traitsValue,
    };

    setIsOnSubmit(true);
    e.preventDefault();

    if (!(await preSubmit())) return setIsOnSubmit(false);

    let response: Response | undefined;

    try {
      if (props.type === "signup") {
        response = await lib.submitLocalSignUpForm({
          traits,
          password,
        });

        if (!response) {
          throw new Error("Failed to create account! Server is busy");
        }

        // success signup
        if (response.status === 201) {
          setData({
            ...data,
            email: inputForm.traitsValue,
            signUpCompleted: true,
          });
        }
      } else if (props.type === "signin") {
        response = await lib.submitLocalSignInForm({
          traits,
          password,
          method,
          csrf,
        });

        if (!response) {
          throw new Error("Failed to create account! Server is busy");
        }

        // success login
        if (response.status === 200) {
          const data = await response.json();

          toast.success("Signed in successfully!", {
            duration: 2000,
            position: "top-center",
          });

          setAuthTokenSession({
            refreshToken: data.refresh_token,
            accessToken: data.access_token,
          });

          setGlobalData({
            ...globalData,
          });

          setIsOnSubmit(false);
          clearInputForm();
          return window.location.replace(inputForm.traitsValue.split("@")[0]);
        }
      } else {
        throw new Error("Invalid form type");
      }

      if (response.status === 400) {
        const error = await response.json();
        toast.warning("Validation fields failed", {
          description: error.message ?? error.errors[0].message,
          position: "top-center",
        });
      }

      if (response.status === 401) {
        const error = await response.json();
        toast.warning("Invalid Cridential ", {
          description: error.error,
          position: "top-center",
        });
      }

      if (response.status === 409) {
        toast.warning("Validation fields failed", {
          description: "Email already registered or fields is invalid",
          position: "top-center",
        });
      }

      if (response.status === 500) {
        const error = await response.json();

        if (error.error === "traits already in use") {
          toast.warning("Validation fields failed", {
            description: "Email already registered",
            position: "top-center",
          });
        }
      }
    } catch (error) {
      if (error instanceof Z.ZodError) {
        toast.warning("Validation fields failed", {
          description: error.errors[0].message,
          position: "top-center",
        });
        return setIsOnSubmit(false);
      }

      if (error instanceof Error) {
        toast.error("Failed to Send Request", {
          position: "top-center",
          description: "Sorry the server is busy, please try again later.",
        });
        return setIsOnSubmit(false);
      }

      toast.error(
        "Sorry, we're having trouble creating your account. Please try again later.",
        {
          position: "top-center",
          description: "Server Busy",
        }
      );
    }

    setIsOnSubmit(false);
  }

  function setAuthTokenSession({
    refreshToken,
    accessToken,
  }: {
    refreshToken: string;
    accessToken: string;
  }): void {
    setTokenSession({ name: "_refresh", value: refreshToken });
    setTokenSession({ name: "_access", value: accessToken });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2" name="signup">
      {/* Email Username or Phone Number Input */}
      <div>
        <MyInput
          size="md"
          radius="sm"
          isRequired
          autoFocus={true}
          placeholder={`Email ${
            !props.username ? "or phone number" : ", username or phone number"
          }`}
          minLength={5}
          maxLength={255}
          color="darker"
          type="text"
          value={inputForm.traitsValue}
          name="traits"
          onValueChange={(value) =>
            setInputForm({ ...inputForm, traitsValue: value })
          }
        />
      </div>

      {/* Password Input */}
      <div>
        <MyInput
          size="md"
          name="password"
          radius="sm"
          isRequired
          placeholder="Password"
          minLength={10}
          maxLength={64}
          color="darker"
          type={"password"}
          value={inputForm.password}
          onValueChange={(value) =>
            setInputForm({ ...inputForm, password: value })
          }
        />
      </div>

      {/* CSRF Protection */}
      {data && data.csrf ? (
        <div className="hidden">
          <input
            type="hidden"
            name="_csrf"
            value={data.csrf}
            hidden
            className="hidden"
          />
        </div>
      ) : null}

      {/* Submit SignUp Form Button */}
      <div>
        <UI.Button
          size="md"
          radius="sm"
          className="flex items-center justify-center text-sm font-medium"
          type="submit"
          fullWidth
          variant="solid"
          color="default"
          disabled={isOnSubmit}
        >
          {!isOnSubmit ? (
            `${props.submitLabel ?? "Sign up"}`
          ) : (
            <LoadingSpinner size="sm" color="current" />
          )}
        </UI.Button>
      </div>

      <div className="mt-2 flex w-full items-center justify-center">
        <p className="max-w-md text-center text-xs">
          Click <b className="dark:text-white/70">Sign Up</b> to agree to
          PeepUp’s &nbsp;
          <UI.Link
            onPress={onOpenTerms}
            rel="noopener noreferrer"
            target="_self"
            as={UI.Link}
            size="sm"
            color="secondary"
            className="text-xs"
            showAnchorIcon
            style={{ cursor: "pointer" }}
            onContextMenu={(e) => e.preventDefault()}
          >
            Terms of Service
          </UI.Link>
          <UI.Modal
            size="lg"
            isOpen={isOpenTerms}
            onOpenChange={onOpenChangeTerms}
            scrollBehavior="inside"
          >
            <TermsConditions />
          </UI.Modal>
          and acknowledge that PeepUp’s
          <UI.Link
            onPress={onOpenPrivacy}
            rel="noopener noreferrer"
            target="_self"
            as={UI.Link}
            size="sm"
            color="secondary"
            className="text-xs"
            showAnchorIcon
            style={{ cursor: "pointer" }}
            onContextMenu={(e) => e.preventDefault()}
          >
            &nbsp; Privacy Policy
          </UI.Link>
          <UI.Modal
            size="lg"
            isOpen={isOpenPrivacy}
            onOpenChange={onOpenChangePrivacy}
            scrollBehavior="inside"
          >
            <PrivacyPolicy />
          </UI.Modal>
          applies to you.
        </p>
      </div>
    </form>
  );
}

export interface AuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  email?: boolean;
  username?: boolean;
  phone_number?: boolean;
  submitLabel?: string;
  type?: AuthFormFor;
  isValidatePassword?: boolean;
  method?: MethodOption;
}

export type AuthFormFor = "signin" | "signup";

export type AuthInputForm = {
  traitsValue: string;
  traitsType?: string;
  password: string;
};
