import { ExternalLink, Code, Trophy, MapPin, Calendar, Mail, User, Briefcase, ArrowRight, Github } from 'lucide-react';
import { 
    SiJavascript, SiReact, SiNodedotjs, SiMongodb, SiDocker, 
    SiAmazonwebservices, SiPython, SiOpenjdk, SiHtml5, SiCss3, 
    SiTailwindcss, SiExpress, SiNextdotjs, SiC, SiCplusplus,
    SiGithub, SiLinkedin, SiAmd, SiFigma
} from 'react-icons/si';

// Import the profile image
import profileImage from '../assets/profile.jpg';

const About = () => {
    const skills = [
        { name: 'C', icon: SiC, color: 'from-blue-400 to-blue-600' },
        { name: 'C++', icon: SiCplusplus, color: 'from-blue-500 to-blue-700' },
        { name: 'JavaScript', icon: SiJavascript, color: 'from-yellow-400 to-yellow-600' },
        { name: 'Java', icon: SiOpenjdk, color: 'from-red-500 to-orange-600' },
        { name: 'Python', icon: SiPython, color: 'from-blue-400 to-yellow-500' },
        { name: 'HTML', icon: SiHtml5, color: 'from-orange-500 to-red-600' },
        { name: 'CSS', icon: SiCss3, color: 'from-blue-400 to-blue-600' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'from-cyan-400 to-blue-500' },
        { name: 'React', icon: SiReact, color: 'from-cyan-400 to-blue-500' },
        { name: 'Next.js', icon: SiNextdotjs, color: 'from-gray-700 to-gray-900' },
        { name: 'Node.js', icon: SiNodedotjs, color: 'from-green-500 to-green-700' },
        { name: 'Express', icon: SiExpress, color: 'from-gray-600 to-gray-800' },
        { name: 'MongoDB', icon: SiMongodb, color: 'from-green-500 to-green-700' },
        { name: 'Docker', icon: SiDocker, color: 'from-blue-500 to-cyan-600' },
        { name: 'AWS', icon: SiAmazonwebservices, color: 'from-orange-400 to-yellow-500' }
    ];

    const achievements = [
        { platform: 'LeetCode', rank: 'Knight', icon: '⚔️', color: 'text-emerald-400' },
        { platform: 'Codeforces', rank: 'Specialist', icon: '🏆', color: 'text-blue-400' }
    ];

    const projects = [
        { name: 'Web Development', count: 15 },
        
    ];

    const projectLinks = [
        {
            name: 'LiveWithCoding',
            url: 'https://github.com/Khiladi124/LiveWithCoding',
            description: 'Interactive coding platform'
        },
        {
            name: 'HealthCare Management with Blockchain',
            url: 'https://github.com/Khiladi124/HealthCare-management-with-Blockchain',
            description: 'Blockchain-based healthcare system'
        },
        {
            name: 'File Storage',
            url: 'https://github.com/Khiladi124/File-Storge',
            description: 'Cloud file storage solution'
        },
        {
            name: 'Food Ordering App',
            url: 'https://github.com/Khiladi124/Food-Ordering-App',
            description: 'Full-stack food delivery platform'
        },
        {
            name: 'Howdy - Chat App',
            url: 'https://github.com/Khiladi124/Howdy--Chat-App',
            description: 'Real-time messaging application'
        },
        {
            name: 'Netflix GPT',
            url: 'https://github.com/Khiladi124/Netflix-GPT',
            description: 'AI-powered movie recommendation'
        },
        {
            name: 'Intrusion Detection System',
            url: 'https://github.com/Khiladi124/Intrusion-Detection-System',
            description: 'Network security monitoring tool'
        }
    ];

    const profiles = [
        {
            name: 'LeetCode',
            username: 'abhi_gang',
            url: 'https://leetcode.com/u/abhi_gang/',
            icon: Code,
            color: 'bg-gradient-to-r from-emerald-500 to-green-600'
        },
        {
            name: 'Codeforces',
            username: 'A_bhishek_04_001',
            url: 'https://codeforces.com/profile/A_bhishek_04_001',
            icon: Trophy,
            color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
        },
        {
            name: 'GitHub',
            username: 'Khiladi124',
            url: 'https://github.com/Khiladi124',
            icon: SiGithub,
            color: 'bg-gradient-to-r from-gray-700 to-gray-900'
        },
        {
            name: 'LinkedIn',
            username: 'abhishek-gangwar',
            url: 'https://www.linkedin.com/in/abhishek-gangwar-a67137168/',
            icon: SiLinkedin,
            color: 'bg-gradient-to-r from-blue-600 to-blue-800'
        }
    ];

    const handleHireMe = () => {
        window.open('https://drive.google.com/file/d/1aH_8efTJCjwSpcVodv9iMgqe6WO1qQJE/view?usp=sharing', '_blank');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4">
                    <nav className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-gray-800">
                            Abhishek<span className="text-orange-500">.</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-gray-700 hover:text-orange-500">Home</a>
                            <a href="#" className="text-gray-700 hover:text-orange-500 flex items-center">
                                Works <ArrowRight className="w-4 h-4 ml-1" />
                            </a>
                            <a href="#" className="text-gray-700 hover:text-orange-500">About</a>
                            <a href="#" className="text-gray-700 hover:text-orange-500">Projects</a>
                            <a href="#" className="text-gray-700 hover:text-orange-500">Services</a>
                        </div>
                        
                    </nav>
                </div>
            </header>

            <div className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Content */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center mb-6">
                                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mr-4">
                                    Hi! I Am
                                </h1>
                                <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                                    SDE/CP
                                </div>
                            </div>
                            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Abhishek Gangwar
                            </h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Designing user interfaces for over 3 years
                                as a product developer
                            </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={handleHireMe}
                                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600"
                            >
                                Hire Me
                            </button>
                            <a href="#" className="text-gray-700 hover:text-orange-500 flex items-center">
                                Projects <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-8 pt-8">
                            <div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">+900</div>
                                <div className="text-gray-600">
                                    Problems solved
                                    <br />
                                    on platforms
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
                                <div className="text-gray-600">Project Done</div>
                            </div>
                        </div>

                        <div>
                            <div className="text-lg font-semibold text-gray-900 mb-2">Contact</div>
                            <div className="text-gray-600">abhishek.gangwar.04.001@gmail.com</div>
                        </div>

                        {/* Project Statistics */}
                        <div className="bg-gray-900 text-white rounded-2xl p-6 mt-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold">
                                    Project
                                    <br />
                                    Statistics 2024
                                </h3>
                            </div>
                            <div className="space-y-3">
                                {projects.map((project, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-gray-300">{project.name}</span>
                                        <span className="text-white font-semibold">{project.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Profile and Skills */}
                    <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-3xl p-8 relative overflow-hidden">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Create Your site in <span className="font-bold">React</span>
                            </h3>
                            <p className="text-gray-700">
                                <span className="font-semibold">Node.js</span> or <span className="font-semibold">Express</span>
                            </p>
                        </div>

                        {/* Profile Image */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <img 
                                    src={profileImage}
                                    alt="Abhishek Gangwar" 
                                    className="w-48 h-64 object-cover rounded-2xl"
                                />
                                
                                {/* Floating Icons */}
                                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                                    <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">JS</span>
                                    </div>
                                </div>
                                
                                <div className="absolute top-1/4 -left-6 bg-white rounded-full p-3 shadow-lg">
                                    <SiFigma className="w-6 h-6 text-purple-500" />
                                </div>
                                
                                <div className="absolute bottom-1/4 -right-6 bg-white rounded-full p-3 shadow-lg">
                                    <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded flex items-center justify-center">
                                        <span className="text-white font-bold text-xs">Xd</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Me */}
                                                <div className="bg-white rounded-xl p-4">
                                                    <div className="flex">
                                                        <input 
                                                            type="text" 
                                                            placeholder="Contact me"
                                                            className="flex-1 px-4 py-2 border-none outline-none text-gray-600"
                                                        />
                                                        <button 
                                                            onClick={() => window.open('mailto:abhishek.gangwar.04.001@gmail.com', '_blank')}
                                                            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                                                        >
                                                            <ArrowRight className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Decorative Circle */}
                        <div className="absolute top-4 right-4 w-16 h-16 bg-orange-300 rounded-full opacity-50"></div>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Technical Skills</h2>
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
                        {skills.map((skill, index) => {
                            const IconComponent = skill.icon;
                            return (
                                <div 
                                    key={index} 
                                    className="group bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
                                >
                                    <div className={`w-10 h-10 bg-gradient-to-r ${skill.color} rounded-lg flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-gray-700 font-medium text-xs">{skill.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Featured Projects</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {projectLinks.map((project, index) => (
                            <a
                                key={index}
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-300 hover:-translate-y-2 border border-gray-200"
                            >
                                <div className="w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <Github className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-gray-900">{project.name}</h3>
                                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                                <div className="flex items-center text-orange-500 group-hover:text-orange-600">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    <span className="text-sm">View on GitHub</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Profiles Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Connect With Me</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {profiles.map((profile, index) => {
                            const IconComponent = profile.icon;
                            return (
                                <a
                                    key={index}
                                    href={profile.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-white rounded-2xl p-6 hover:bg-gray-50 transition-all duration-300 hover:-translate-y-2 border border-gray-200"
                                >
                                    <div className={`w-12 h-12 ${profile.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-center mb-2 text-gray-900">{profile.name}</h3>
                                    <p className="text-gray-600 text-center text-xs mb-4">{profile.username}</p>
                                    <div className="flex items-center justify-center text-orange-500 group-hover:text-orange-600">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        <span className="text-sm">Visit Profile</span>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;