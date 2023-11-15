import { registerEnumType } from '@nestjs/graphql';
import { TaskStatus } from '@prisma/client';

export { TaskStatus };
registerEnumType(TaskStatus, {
  name: 'TaskStatus',
});
