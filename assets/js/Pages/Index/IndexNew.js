import React from 'react';
import Navbar from "@/Components/Landing/Navbar/Navbar";
import Hero from "@/Components/Landing/Hero/Hero";
import Preview from "@/Components/Landing/Preview/Preview";

const Index = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <div id='about'>
                <Preview
                    invert={true}
                    section='System dashboard'
                    image='/assets/images/dashboard_preview.png'
                    title='Stay in Control with Our System Dashboard'
                    subtitle='Effortlessly manage and monitor your e-sports tournaments and activities from a centralized and intuitive dashboard.'
                />
                <Preview
                    invert={false}
                    section='Competitive tournaments'
                    image='/assets/images/tournaments_preview.png'
                    title='"Experience the Thrill of Competitive Tournaments'
                    subtitle='Join our exhilarating e-sports tournaments and put your skills to the test against top-level competitors for fame, glory, and amazing rewards.'
                />
                <Preview
                    invert={true}
                    section='Responsive creativity'
                    image='/assets/images/create_preview.png'
                    title='Unleash Your Creative Vision and Organize Tournaments with ease'
                    subtitle='Design and customize your own tournaments with ease, tailoring the rules, formats, and settings to create unique and engaging gaming experiences.'
                />
                <Preview
                    invert={false}
                    section='Dive into gaming community'
                    image='/assets/images/friends_preview.png'
                    title='Immerse Yourself in a Vibrant Gaming Community'
                    subtitle='Connect, socialize, and forge new friendships with like-minded gamers as you dive into our thriving gaming community, filled with passion, support, and endless opportunities for collaboration.'
                />
                <Preview
                    invert={true}
                    section='Achieve!'
                    image='/assets/images/achievements_preview.png'
                    title='Unlock Your Potential and Achieve Greatness'
                    subtitle='Embark on an epic journey of self-improvement, level up your gaming skills, unlock achievements, and celebrate your victories as you strive to reach new heights in the world of e-sports.'
                />
            </div>
        </div>
    );
}

export default Index;
