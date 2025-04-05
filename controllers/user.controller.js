import prisma from '../prisma/index.js';


export const getAllUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
}

export const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
}

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

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const {name, email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = await prisma.user.update({
        where: {id: Number(id)},
        data: {
            name,
            email,
            password
        }
    })

    res.json({ message: 'User updated successfully', user: updatedUser });
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
    }); 

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    await prisma.user.delete({ where: { id: Number(id) } });

    res.json({ message: 'User deleted successfully' });
}