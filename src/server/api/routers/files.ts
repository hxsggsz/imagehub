import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { z } from 'zod'

export const filesRouter = createTRPCRouter({
  getAll: protectedProcedure
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
})
