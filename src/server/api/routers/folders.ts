import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import { imageDefault } from '@/utils/imageDefault'

const random = Math.floor(Math.random() * 6 + 1)

export const folderRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.folders.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    })
  }),

  getUnique: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.folders.findUnique({
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
        backgroundImage: z.string().url().optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.folders.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          backgroundImage: input.backgroundImage ?? imageDefault(random),
        },
      })
    }),
})
