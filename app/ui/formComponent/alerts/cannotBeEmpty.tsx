import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


export function CannotBeEmpty({errorText}: {errorText: string}) {
  return (
    <Alert variant="destructive" className="errorAlert">
    <AlertTitle>Error: </AlertTitle>
    <AlertDescription>
        {errorText}
    </AlertDescription>
  </Alert>
  );
}