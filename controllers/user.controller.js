import prisma from '../prisma/index';

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const findUser = await prisma.user.findUnique({
        where: { email }
    })

    if (findUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password
        },
    });

    res.status(201).json({ message: 'User created successfully', user });
};