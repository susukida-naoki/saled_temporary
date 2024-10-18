import { useEffect, useState } from 'react';
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
import Campaign from './Campaign';
import './Meeting.css';

function Meeting() {
  const [client, setClient] = useState<any>(null);
  const [isJoined, setIsJoined] = useState(false);

    useEffect(() => {
        const initializeZoom = async () => {
            const zoomClient = ZoomMtgEmbedded.createClient();
            setClient(zoomClient);

            const meetingSDKElement = document.getElementById("meetingSDKElement");
            if (meetingSDKElement) {
                try {
                    await zoomClient.init({
                        zoomAppRoot: meetingSDKElement,
                        language: "en-US",
                        patchJsMedia: true,
                        leaveOnPageUnload: true,
                        customize: {
                            video: {
                                isResizable: true,
                                viewSizes: {
                                    default: {
                                        width: 1000,
                                        height: 600
                                    },
                                    ribbon: {
                                        width: 1132,
                                        height: 635
                                    }
                                }
                            }
                        }
                    });
                    getSignature(zoomClient);
                } catch (error) {
                    console.error("Error initializing Zoom client:", error);
                }
            }
        };
        initializeZoom();
    }, []);

    const getSignature = async (zoomClient: any) => {
        const authEndpoint = import.meta.env.VITE_ZOOM_MEETING_SDK_AUTH_ENDPOINT;
        const sdkKey = import.meta.env.VITE_ZOOM_MEETING_SDK_KEY;
        const meetingNumber = import.meta.env.VITE_ZOOM_MEETING_NUMBER;
        const passWord = import.meta.env.VITE_ZOOM_MEETING_PASSWORD;
        const role = import.meta.env.VITE_ZOOM_MEETING_ROLE;
        const userName = import.meta.env.VITE_ZOOM_MEETING_SDK_USERNAME || "Default User";
        const userEmail = "";
        const registrantToken = "";
        const zakToken = "";

        try {
        if (!authEndpoint) {
            throw new Error("ZOOM_MEETING_SDK_AUTH_ENDPOINT is not defined");
        }
        const req = await fetch(authEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            meetingNumber: meetingNumber || "",
            role: role,
            }),
        });
        const res = await req.json()
        const signature = res.signature as string;
        startMeeting(zoomClient, signature, sdkKey, meetingNumber, passWord, userName, userEmail, registrantToken, zakToken);
        } catch (e) {
        console.error("Error getting signature:", e);
        }
    };

  async function startMeeting(
    zoomClient: any,
    signature: string,
    sdkKey: string,
    meetingNumber: string,
    password: string,
    userName: string,
    userEmail: string,
    registrantToken: string,
    zakToken: string
  ) {
    try {
      await zoomClient.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber || "",
        password: password,
        userName: userName,
        userEmail: userEmail,
        tk: registrantToken,
        zak: zakToken,
      });

      console.log("joined successfully");
      setIsJoined(true);
    } catch (error) {
      console.error("Error joining meeting:", error);
    }
  }

  return (
    <div className="meeting-page">
      {isJoined && (
        <div className="campaign-container">
          <Campaign />
        </div>
      )}
      <div className="zoom-container" id="meetingSDKElement">
        {/* Zoom Meeting SDK Component View Rendered Here */}
      </div>
    </div>
  );
}

export default Meeting;