export const firstLetterUppercase = (
    message: string = 'First letter must be uppercase'
) => {
    return [
        (value: string) => value.charAt(0) === value.charAt(0).toUpperCase(),
        message,
    ] as const;
};

export const dateNotInFuture = (
    message: string = 'Date cannot be in the future'
) => {
    return [(value: Date) => value <= new Date(), message] as const;
};
