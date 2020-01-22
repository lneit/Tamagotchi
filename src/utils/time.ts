export const timestamp = () => {
    const now = new Date().toISOString();
    return `${now.slice(11, 19)}`;
};