'use client';
import './home.scss';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";

import FormComponent from './ui/formComponent/formComponent';
import SkeletonCard from './loading';
import { formStore } from './stores/store';
import { CannotBeEmpty } from './ui/formComponent/alerts/cannotBeEmpty';
import JobIdComponent from './ui/jobIdComponent/jobIdComponent';
import { Button } from '@/components/ui/button';

type Course = {
  id: string;
  title: string;
  description: string;
  instructorName: string | null;
  courseLogoUrl: string;
  thumbnailUrl: string;
  createdDate: string | null;
  creatingUser: string | null;
  creatingUserName: string | null;
  videoScriptTone: string | null;
  startDate: string;
  endDate: string;
  shortCourse: boolean;
  category: string | null;
  skillLevel: string;
  skills: string[];
  duration: string;
  topics: string;
  courseCode: string | null;
  status: string | null;
  dateCompleted: string | null;
  totalCourseCredits: number | null;
  nqfLevel: number | null;
};

export default function Home() {
  const formInfo = formStore((state) => state?.form);

  if (formInfo.loading) {
    return (
      <main className="main">
        <FormComponent />
        {formInfo.jobId && <JobIdComponent />}
        <div className="list-courses">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <FormComponent />

        {formInfo.jobId && <JobIdComponent />}
        {formInfo.data.length > 0 && <Button variant="ghost">total: {formInfo.data.length}</Button>}
      <div className="list-courses">
        {formInfo.data.length > 0 &&
          formInfo.data.map((course: Course, index: number) => (
            <Card className="w-[350px] h-[350px] card-item" key={index}>
              <CardContent className="card-content">
                <img
                  src={course.thumbnailUrl || '/me.jpg'} // Fallback to default if thumbnailUrl is missing
                  alt={course.title || "Course Image"}
                  className="card-image"
                />
              </CardContent>
              <CardFooter className="card-footer">
                <CardTitle>{course.title||'this is a custom title'}</CardTitle>
                <CardDescription className="description">
                  {course.description
                    ? course.description.split(" ").slice(0, 10).join(" ") + "..."
                    : "No description available."}
                </CardDescription>
              </CardFooter>
            </Card>
          ))}
      </div>
      {formInfo?.error?.errorText && <CannotBeEmpty errorText={formInfo.error.errorText} />}
    </main>
  );
}
