import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

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
        backgroundImageKey: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
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
      return await ctx.prisma.folders.delete({
        where: {
          id: input.id,
        },
      })
    }),
})
