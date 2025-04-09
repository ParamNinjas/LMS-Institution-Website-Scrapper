'use client';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { scrapeCourses } from "@/app/actions/endpoints";
import { formStore } from "@/app/stores/store";


export default function FormComponent() {
    const updateUserFunc = formStore((state) => state?.updateData);
    const formInfo = formStore((state) => state?.form);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!formInfo.url) {
            updateUserFunc({
                error: {
                    errorText: "URL cannot be empty",
                    urlError: true,
                    envError: false,
                    dataError: false,
                }
            });
            console.log(`error: ${formInfo.error.urlError} ${formInfo.error.errorText}`)
            return;
        }

        

        if (!formInfo.env_clientKey) {
            updateUserFunc({
                error: {
                    errorText: "You must select an environment",
                    urlError: false,
                    envError: true,
                    dataError: false,
                }
            });
            console.log(`error: ${formInfo.error.envError} ${formInfo.error.errorText}`);
            return;
        }


        updateUserFunc({
            error: {
                errorText: "",
                urlError: false,
                envError: false,
                dataError: false,
            }
        });

        updateUserFunc({
            error: {
                errorText: "",
                urlError: false,
                envError: false,
                dataError: false,
            }
        });

        try {
            updateUserFunc({ loading: true });

            // Simulate a network request with a delay
            const res = await scrapeCourses(formInfo.url, formInfo.env_clientKey);
            debugger;
            if (!res) {
                updateUserFunc({
                    error: {
                        errorText: "An error occurred while submitting the form",
                        urlError: false,
                        envError: false,
                        dataError: true,
                    }
                });
                return;
            }
            updateUserFunc({ jobId: res?.jobId });
            updateUserFunc({ status: res?.status });
            updateUserFunc({ loading: false });

            // Placeholder response, replace with actual network cal

            if (res) {
                updateUserFunc({ data: res });
            }
        } catch (error) {
            console.error("Error scraping courses:", error);
            updateUserFunc({
                error: {
                    errorText: "An error occurred while submitting the form",
                    urlError: false,
                    envError: false,
                    dataError: true,
                }
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className={`input ${formInfo.error.envError && 'error'}`}>
                <Select onValueChange={(e) => updateUserFunc({ env_clientKey: e })}>
                    <SelectTrigger className={`w-[250px]`}>
                        <SelectValue placeholder="Select Env" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="ec51852d24b1450faff0a868e84d05e5">Dev</SelectItem>
                            <SelectItem value="1432de273b4b46bbaece832f43547e80">QA</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Input
                    type="text"
                    id="url"
                    placeholder="Paste URL"
                    className={`${formInfo.error.urlError && 'InputError'}`}
                    value={formInfo.url}
                    onChange={(e) => updateUserFunc({ url: e.target.value })}
                />
                <Button type="submit" className={`${formInfo.status == "Processing" && "preventButtonClick"}`}>Submit</Button>
            </div>
        </form>
    );
}
