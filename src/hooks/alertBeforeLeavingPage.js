import {useEffect, useState} from "react";
import {Prompt} from "react-router-dom";

const alertBeforeLeavingPage=(message="Are you sure you want to discard changes ?")=>{
    const [isDirty,setDirty]=useState(false);
    useEffect(()=>{
        window.onbeforeunload = isDirty && (()=>message);
        return ()=>{
            window.onbeforeunload =null;
        };
    },[isDirty]);
    const routerPrompt = <Prompt when={isDirty} message={message} />

    return [routerPrompt,()=>setDirty(true),()=>setDirty(false)];
}

export  default alertBeforeLeavingPage;
