'use server';

import { prisma } from '@live-style/database';

export async function getPartnerCourses(userId: string) {
  const enrollments = await prisma.enrollment.findMany({
    where: { userId },
    include: {
      course: {
        include: {
          modules: {
            include: {
              lessons: true
            }
          }
        }
      }
    }
  });

  return enrollments.map(e => e.course);
}

export async function getCourseDetails(courseId: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' }
          }
        }
      }
    }
  });

  return course;
}
