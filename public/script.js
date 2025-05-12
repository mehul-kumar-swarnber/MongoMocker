document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".firstbutton");

    if (button) {
        button.addEventListener("click", async () => {
            console.log("Button clicked!!");

            try {
                const response = await fetch("/add-data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const result = await response.json();
                if (result.success) {
                    console.log("Data inserted:", result.data);
                    alert("Random data inserted successfully!");
                } else {
                    console.error("Error inserting data:", result.message);
                }
            } catch (error) {
                console.error("Request failed:", error);
            }
        });
    } else {
        console.error("Button not found!");
    }
});
