export default async function handler(req, res) {
    // 1. Solo permitimos peticiones POST (que es lo que enviará nuestro frontend)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Solo se permite el método POST' });
    }

    // 2. Recibimos el texto que nos manda el frontend
    const { prompt } = req.body;

    // 3. Sacamos la API Key secreta que guardaremos en Vercel
    const apiKey = process.env.GEMINI_API_KEY; 

    // 4. Preparamos la URL de Google
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    try {
        // 5. Hacemos la petición a Google desde el servidor (oculto al usuario)
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        
        // 6. Devolvemos la respuesta de Google a nuestro frontend
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error comunicando con Gemini' });
    }
}