import { formStore } from "@/app/stores/store";
import {Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { refreshCourses } from "@/app/actions/endpoints";

export default function JobIdComponent() {
  const formInfo = formStore((state) => state?.form);
  const updateUserFunc = formStore((state) => state?.updateData);

    async function refreshFucntion() {
        updateUserFunc({ loading: true });
        try {

            const res = await refreshCourses(formInfo.jobId, formInfo.env_clientKey);
            debugger;
            if (!res) {
                updateUserFunc({
                    error: {
                        errorText: "An error occurred while refreshing the courses",
                        urlError: false,
                        envError: false,
                        dataError: true,
                    }
                });
                return;
            }
            updateUserFunc({ status: res?.status });
            updateUserFunc({ loading: false });
        }  catch (error) {
            console.error("Error refreshing courses:", error);
            updateUserFunc({
                error: {
                    errorText: "An error occurred while refreshing the courses",
                    urlError: false,
                    envError: false,
                    dataError: true,
                }
            });
            updateUserFunc({ loading: false });
        }
    }

  return (
    <div>
          <Table className='table'>
          <TableCaption>The scraper is running in the background.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{formInfo.jobId}</TableCell>
              <TableCell>
                <Badge variant="secondary" 
                style={{
                    backgroundColor:`${formInfo.status == "Processing" ? "#ffd600":"#029f3f"}`,padding:'5px 10px'}}>
                    {formInfo.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {formInfo.loading ?  
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Loading...
                </Button>
                :<Button variant="secondary" onClick={refreshFucntion}>refresh</Button>}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
  );
}