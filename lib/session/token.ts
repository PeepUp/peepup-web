// Short duration JWT token (5-10 min)
export function getTokenSession(name: string): string | null {
    return sessionStorage.getItem(name);
}

export function setTokenSession({ name, value }: { name: string; value: string }): void {
    sessionStorage.setItem(name, value);
}

export function clearTokenSession(name: string[]): void {
    name.forEach((item) => sessionStorage.removeItem(item));
}
