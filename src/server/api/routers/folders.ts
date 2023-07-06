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

  deleteFolder: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      // todo: delete the images inside the folder
      const folderImage = await ctx.prisma.folders.findUnique({
        where: {
          id: input.id,
        },
      })

      if (folderImage?.backgroundImageKey) {
        await utapi.deleteFiles(folderImage.backgroundImageKey)
      }

      return await ctx.prisma.folders.delete({
        where: {
          id: input.id,
        },
      })
    }),
})
