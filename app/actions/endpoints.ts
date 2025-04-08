export async function scrapeCourses(url:string, env:string) {
    try {
        const request = url;
          
        const response = await fetch('https://thooto.delightfulsand-522a7ecb.southcentralus.azurecontainerapps.io/api/v1/Courses/Scrap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Client-Key': env,
            },
            body: JSON.stringify(request)
        });
        debugger;
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error scraping courses:", error);
    }
}

export async function refreshCourses(jobid:string, env:string) {
    try {
          
        const response = await fetch(`https://thooto-scraper.azurewebsites.net/api/v1/Courses/ScrapStatus/${jobid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Client-Key': env,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error scraping courses:", error);
    }
}
