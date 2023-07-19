import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { TRPCError } from '@trpc/server'
import { utapi } from 'uploadthing/server'

export const folderRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.folders.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }),

  getUnique: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.folders.findUnique({
        where: {
          id: input.id,
        },
      })
    }),

  createFolder: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(3, 'name is too short')
          .max(30, 'name is too long'),
        backgroundImage: z.string().url(),
        backgroundImageKey: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const getAllFolders = await ctx.prisma.folders.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      })
      const checkFolderName = getAllFolders.find(
        (folders) => folders.name === input.name,
      )

      if (checkFolderName) {
        throw new TRPCError({
          message: 'folder with the same name registered before',
          code: 'CONFLICT',
        })
      }

      return await ctx.prisma.folders.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          backgroundImage: input.backgroundImage,
          backgroundImageKey: input.backgroundImageKey,
        },
      })
    }),

  updateFolderName: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        name: z
          .string()
          .min(3, 'name is too short')
          .max(30, 'name is too long'),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const getFolder = await ctx.prisma.folders.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!getFolder) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'this folder does&apos;t exist',
        })
      }

      return await ctx.prisma.folders.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      })
    }),

  deleteFolder: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const folderImage = await ctx.prisma.folders.findUnique({
        where: {
          id: input.id,
        },
      })

      if (!folderImage) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'folder not found',
        })
      }

      const filesInsideFolder = await ctx.prisma.images.findMany({
        where: {
          foldersId: folderImage.id,
        },
      })

      for (const files of filesInsideFolder) {
        if (files.imageKey) {
          await utapi.deleteFiles(files.imageKey)
        }
      }

      if (folderImage?.backgroundImageKey) {
        await utapi.deleteFiles(folderImage.backgroundImageKey)
      }

      return await ctx.prisma.folders.delete({
        where: {
          id: input.id,
        },
      })
    }),

  deleteManyFolders: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid().array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const folderImage = await ctx.prisma.folders.findMany({
        where: {
          id: { in: input.id },
        },
      })

      const folderImageIds = folderImage.map((folder) => folder.id)

      const filesInsideFolder = await ctx.prisma.images.findMany({
        where: {
          foldersId: { in: folderImageIds },
        },
      })

      for (const files of filesInsideFolder) {
        if (files.imageKey) {
          await utapi.deleteFiles(files.imageKey)
        }
      }

      for (const folder of folderImage) {
        if (folder.backgroundImageKey) {
          await utapi.deleteFiles(folder.backgroundImageKey)
        }
      }

      return await ctx.prisma.folders.deleteMany({
        where: {
          id: { in: input.id },
        },
      })
    }),
})
