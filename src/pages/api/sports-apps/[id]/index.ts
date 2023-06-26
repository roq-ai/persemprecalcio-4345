import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { sportsAppValidationSchema } from 'validationSchema/sports-apps';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.sports_app
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSportsAppById();
    case 'PUT':
      return updateSportsAppById();
    case 'DELETE':
      return deleteSportsAppById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSportsAppById() {
    const data = await prisma.sports_app.findFirst(convertQueryToPrismaUtil(req.query, 'sports_app'));
    return res.status(200).json(data);
  }

  async function updateSportsAppById() {
    await sportsAppValidationSchema.validate(req.body);
    const data = await prisma.sports_app.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    if (req.body.name) {
      await roqClient.asUser(roqUserId).updateTenant({ id: user.tenantId, tenant: { name: req.body.name } });
    }
    return res.status(200).json(data);
  }
  async function deleteSportsAppById() {
    const data = await prisma.sports_app.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
