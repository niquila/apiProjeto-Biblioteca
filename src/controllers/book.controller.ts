import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllBooks = async (_req: Request, res: Response) => {
  const books = await prisma.book.findMany({
    include: { author: true, category: true }
  });
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = await prisma.book.findUnique({
    where: { id },
    include: { author: true, category: true }
  });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
  const data = req.body;
  // prisma expects Date for published (Zod already transforms)
  const book = await prisma.book.create({ data });
  res.status(201).json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  const book = await prisma.book.update({ where: { id }, data });
  res.json(book);
};

export const deleteBook = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await prisma.book.delete({ where: { id } });
  res.status(204).send();
};
