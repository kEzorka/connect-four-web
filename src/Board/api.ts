export const sendPlayerMove = async (player : string, column : number, board : string[][]) => {
    try {
        const response = await fetch('http://localhost:8080/move', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player, column, board }),
        });

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка запроса:', error);
        throw error;
    }
};
