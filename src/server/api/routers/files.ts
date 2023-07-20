import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/server/api/trpc'
import { utapi } from 'uploadthing/server'
import { z } from 'zod'

export const filesRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.images.findMany({
        where: {
          foldersId: input.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }),

  newFile: protectedProcedure
    .input(
      z.object({
        FoldersId: z.string().cuid(),
        name: z.string(),
        image: z.string().url(),
        imageKey: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.images.create({
        data: {
          image: input.image,
          imageKey: input.imageKey,
          name: input.name,
          Folders: { connect: { id: input.FoldersId } },
        },
      })
    }),
  deleteFile: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const fileToDelete = await ctx.prisma.images.findUnique({
        where: {
          id: input.id,
        },
      })

      if (fileToDelete?.imageKey) {
        await utapi.deleteFiles(fileToDelete.imageKey)
      }

      return ctx.prisma.images.delete({
        where: {
          id: input.id,
        },
      })
    }),

  deleteManyFiles: protectedProcedure
    .input(
      z.object({
        fileId: z.string().cuid().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const files = await ctx.prisma.images.findMany({
        where: {
          id: { in: input.fileId },
        },
      })

      for (const file of files) {
        if (file.imageKey) {
          await utapi.deleteFiles(file.imageKey)
        }
      }

      await ctx.prisma.images.deleteMany({
        where: {
          id: { in: input.fileId },
        },
      })
    }),
})
