import React, { useState, useEffect } from 'react';

export default function Blog() {

    const [blog, setBlog] = useState("")

    useEffect(() => {
        fetch("/api/blog").then((r) => {
            if (r.ok) {r.json().then((data) => {
              setBlog(data)});
            }});
        }, [setBlog]);
    
    return (
        <div>
            <p>Title: {blog[0]?.title}</p>
            <p>Body: {blog[0]?.body}</p>
        </div>
    )
}