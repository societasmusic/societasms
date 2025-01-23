"use client"

export default function Greeting() {
    let date = new Date();
    let hour = date.getHours();
    if (hour>=17) return `Good evening`;
    else if (hour>=12) return `Good afternoon`;
    else return `Good morning`;
}