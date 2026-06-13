import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { RequestsModule } from './requests/requests.module';
import { UploadModule } from './upload/upload.module';
import { VideosModule } from './videos/videos.module';
import { SiteContentModule } from './site-content/site-content.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    PrismaModule,
    AuthModule,
    ProjectsModule,
    TestimonialsModule,
    RequestsModule,
    UploadModule,
    VideosModule,
    SiteContentModule,
  ],
})
export class AppModule {}
