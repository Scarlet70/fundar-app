import axios from "axios";

const handleApiErrorToast = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
            return {
                title: "Request timed out",
                description:
                    "The request took too long. Please check your internet connection and try again.",
            };
        }

        if (!error.response) {
            return {
                title: "No server connection",
                description:
                    "Please check your network connection and try again.",
            };
        }

        return {
            title: "Request failed",
            description:
                error.response.data?.message ||
                error.message ||
                "Unable to complete the request. Please try again.",
        };
    }

    //not an axios error
    return {
        title: "Something went wrong",
        description: "Please try again later.",
    };
};

export default handleApiErrorToast;
