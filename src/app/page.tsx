'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { getNames } from 'country-list';
import Logo from '@/components/logo/Logo';
import { GradientDots } from '@/components/ui/gradient-dots';
import { BorderBeam } from '@/components/ui/border-beam';
import {
    CheckCircle,
    Play,
    BookOpen,
    BarChart3,
    GraduationCap,
    Users,
    Zap,
    ArrowRight,
    Mail,
    Star,
    TrendingUp,
    Award,
    Shield,
} from 'lucide-react';
import { Spotlight } from '@/components/ui/spotlight';
import { cn } from '@/lib/utils';

export default function Home() {
    const [form, setForm] = useState({ name: '', country: '', email: '' });
    const [message, setMessage] = useState('');
    const countries = getNames();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                setMessage('Error: ' + (data?.error || 'Something went wrong'));
                return;
            }

            if (data?.success) {
                setMessage('Welcome to the next generation of certified creators. You are in.');
                setForm({ name: '', country: '', email: '' });
            }
        } catch (err) {
            setMessage('Network error: ' + (err as Error).message);
        }
    };

    const scrollToForm = () => {
        const formElement = document.getElementById('waitlist-form');
        if (formElement) {
            formElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950 min-h-screen">
            {/* Hero Section */}
            <section className="relative flex h-[calc(100dvh-80px)] w-full overflow-hidden antialiased md:items-center md:justify-center">
                {/* Background grid */}
                <div
                    className={cn(
                        'pointer-events-none absolute inset-0 [background-size:40px_40px] select-none',
                        '[background-image:linear-gradient(to_right,#0d2a4c_1px,transparent_1px),linear-gradient(to_bottom,#0d2a4c_1px,transparent_1px)]'
                    )}
                />

                {/* Spotlight Effect */}
                <Spotlight className="top-0 left-0 md:top-0 md:left-1/4" fill="white" />

                {/* Hero Content */}
                <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0 text-center">
                    <div className="flex justify-center mb-8">
                        <div className="p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 shadow-xl backdrop-blur-sm">
                            <Logo />
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#017bde]/10 dark:bg-[#017bde]/30 rounded-full text-[#017bde] dark:text-blue-300 text-sm font-medium mb-6">
                            <Award className="w-4 h-4" />
                            Official Certification Program
                        </div>
                    </div>
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-gray-900 dark:text-white mb-8 leading-none">
                        The Resident Creator™
                        <span className="block mt-4 bg-gradient-to-r from-[#017bde] to-[#0056b3] bg-clip-text text-transparent">
                            Certification
                        </span>
                    </h1>
                    <p className="text-xl lg:text-2xl xl:text-3xl text-gray-600 dark:text-gray-300 mb-10 max-w-5xl mx-auto leading-relaxed font-light">
                        The first official certification program <strong>built with brands</strong>,
                        <strong>designed for creators</strong>, and
                        <strong>backed by research</strong>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <Button
                            onClick={scrollToForm}
                            size="lg"
                            className="bg-gradient-to-r from-[#017bde] to-[#0056b3] hover:from-[#0056b3] hover:to-[#013d7a] text-white font-bold text-lg px-10 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            Join the Waitlist Today (Free)
                            <ArrowRight className="ml-3 w-5 h-5" />
                        </Button>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium">Limited early spots available</span>
                        </div>
                    </div>
                    {/* Trust Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
                        <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg">
                            <Users className="w-6 h-6 text-[#017bde]" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                500+ Early Members
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg">
                            <Shield className="w-6 h-6 text-[#017bde]" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                Research Backed
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-lg">
                            <TrendingUp className="w-6 h-6 text-[#017bde]" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                Brand Approved
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem + Solution Combined Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Problem Side */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#017bde]/10 dark:bg-[#017bde]/30 rounded-full text-[#017bde] dark:text-blue-300 text-sm font-medium">
                                <TrendingUp className="w-4 h-4 rotate-180" />
                                The Current Problem
                            </div>
                            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                                The influencer era is
                                <span className="text-[#017bde] dark:text-blue-400"> ending.</span>
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                <p>
                                    Creators today fight for views, followers, and likes — but
                                    brands don&apos;t care about noise anymore.
                                </p>
                                <p>
                                    They want creators who can embed inside their story, strategy,
                                    and campaigns.
                                </p>
                                <div className="p-6 bg-gradient-to-r from-[#017bde]/10 to-[#017bde]/20 dark:from-[#017bde]/20 dark:to-[#017bde]/30 rounded-xl border-l-4 border-[#017bde]">
                                    <p className="text-[#017bde] dark:text-blue-300 font-semibold text-xl">
                                        The gap? Most creators don&apos;t know how to position
                                        themselves for long-term deals.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Solution Side */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#017bde]/10 dark:bg-[#017bde]/30 rounded-full text-[#017bde] dark:text-blue-300 text-sm font-medium">
                                <Star className="w-4 h-4" />
                                Our Solution
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                                That&apos;s why we built
                                <span className="text-[#017bde] dark:text-blue-400">
                                    The Resident Creator™.
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                                TRC is not another &quot;how to get viral&quot; guide. It&apos;s an
                                official certification program that:
                            </p>

                            <div className="space-y-4">
                                {[
                                    'Teaches you what brands actually look for',
                                    'Equips you with tools to become irreplaceable in partnerships',
                                    'Gives you credibility with a recognized certification',
                                    'Prepares you for long-term success, not short-term hacks',
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-[#017bde]/5 to-[#017bde]/10 dark:from-[#017bde]/10 dark:to-[#017bde]/20 border border-[#017bde]/20 dark:border-[#017bde]/30"
                                    >
                                        <CheckCircle className="w-6 h-6 text-[#017bde] dark:text-blue-400 flex-shrink-0 mt-1" />
                                        <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <Button
                                onClick={scrollToForm}
                                size="lg"
                                className="bg-gradient-to-r from-[#017bde] to-[#0056b3] hover:from-[#0056b3] hover:to-[#013d7a] text-white font-bold text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Get Started Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You'll Get Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#017bde]/10 dark:bg-[#017bde]/30 rounded-full text-[#017bde] dark:text-blue-300 text-sm font-medium mb-6">
                            <GraduationCap className="w-4 h-4" />
                            Program Contents
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            What&apos;s inside The Resident Creator™ Program
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Everything you need to become the certified creator brands are actively
                            seeking
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Play className="w-10 h-10" />,
                                title: 'Video Modules',
                                description: 'Short, high-impact lessons from brand strategists',
                                color: 'from-[#017bde] to-[#0056b3]',
                            },
                            {
                                icon: <BookOpen className="w-10 h-10" />,
                                title: 'Workbooks',
                                description: 'Practical exercises to apply instantly',
                                color: 'from-[#017bde] to-[#0056b3]',
                            },
                            {
                                icon: <BarChart3 className="w-10 h-10" />,
                                title: 'Case Studies',
                                description:
                                    'Real examples of creators who secured long-term deals',
                                color: 'from-[#017bde] to-[#0056b3]',
                            },
                            {
                                icon: <GraduationCap className="w-10 h-10" />,
                                title: 'Certification',
                                description: "Proof you're trained and brand-ready",
                                color: 'from-[#017bde] to-[#0056b3]',
                            },
                        ].map((item, index) => (
                            <div key={index} className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                                    <div
                                        className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.color} text-white mb-6 shadow-lg`}
                                    >
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Credibility Section */}
            <section className="py-20 px-4">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#017bde]/10 dark:bg-[#017bde]/30 rounded-full text-[#017bde] dark:text-blue-300 text-sm font-medium mb-8">
                            <Shield className="w-4 h-4" />
                            Research & Credibility
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-12">
                            Backed by brands.
                            <span className="block mt-2">Designed for creators.</span>
                        </h2>
                        <div className="bg-gradient-to-br from-[#017bde]/5 to-[#017bde]/10 dark:from-[#017bde]/10 dark:to-[#017bde]/20 p-12 rounded-3xl border border-[#017bde]/20 dark:border-[#017bde]/30">
                            <div className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 space-y-8 max-w-4xl mx-auto leading-relaxed">
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    We interviewed marketing teams, agencies, and creators across
                                    industries.
                                </p>
                                <p>
                                    The result is a program that bridges the gap between what
                                    creators think brands want… and what brands actually invest in.
                                </p>
                                <div className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
                                    <p className="text-2xl text-[#017bde] dark:text-blue-400 font-bold">
                                        This isn&apos;t theory. It&apos;s research, fieldwork, and
                                        industry insight — built into one streamlined program.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Urgency Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-[#017bde]/5 to-[#017bde]/10 dark:from-[#017bde]/5 dark:to-[#017bde]/10">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#017bde]/10 dark:bg-[#017bde]/30 rounded-full text-[#017bde] dark:text-blue-300 text-sm font-medium mb-8">
                            <Users className="w-4 h-4" />
                            Limited Spots
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8">
                            Be among the first
                            <span className="text-[#017bde] dark:text-blue-400">500 creators</span>
                            <span className="block mt-2">worldwide.</span>
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                            Early members get exclusive benefits:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[
                            {
                                title: 'Priority Access',
                                description: 'Priority access to the certification',
                                icon: <Star className="w-8 h-8" />,
                                color: 'from-[#017bde] to-[#0056b3]',
                            },
                            {
                                title: 'Founding Member',
                                description: 'Recognition as founding TRC creators',
                                icon: <Award className="w-8 h-8" />,
                                color: 'from-[#017bde] to-[#0056b3]',
                            },
                            {
                                title: 'Exclusive Perks',
                                description: 'Exclusive perks as we expand globally',
                                icon: <Users className="w-8 h-8" />,
                                color: 'from-[#017bde] to-[#0056b3]',
                            },
                        ].map((item, index) => (
                            <div key={index} className="group">
                                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                                    <div
                                        className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.color} text-white mb-6 shadow-lg`}
                                    >
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Button
                            onClick={scrollToForm}
                            size="lg"
                            className="bg-gradient-to-r from-[#017bde] to-[#0056b3] hover:from-[#0056b3] hover:to-[#013d7a] text-white font-bold text-xl px-12 py-6 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            Reserve My Spot (Free)
                            <ArrowRight className="ml-3 w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-tl from-blue-50 via-white to-purple-50 dark:from-blue-900/20 dark:via-gray-900 dark:to-purple-900/20">
                <div className="container mx-auto max-w-5xl text-center">
                    <h2 className="text-4xl lg:text-6xl font-bold mb-8">
                        The new creator standard
                        <span className="block mt-2 bg-gradient-to-r from-[#017bde] to-[#0056b3] bg-clip-text text-transparent">
                            starts here.
                        </span>
                    </h2>
                    <div className="text-xl lg:text-2xl text-gray-300 space-y-6 mb-12 max-w-3xl mx-auto leading-relaxed">
                        <p>Don&apos;t adapt to outdated trends.</p>
                        <p className="text-2xl font-semibold text-white">
                            Become the certified creator brands are searching for.
                        </p>
                    </div>

                    {/* <Button
                        onClick={scrollToForm}
                        size="lg"
                        className="text-white bg-[#017bde]  font-bold text-xl px-12 py-6 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                        Join the Waitlist Today
                        <ArrowRight className="ml-3 w-6 h-6" />
                    </Button> */}
                </div>
            </section>

            {/* Single Waitlist Form Section */}
            <section
                id="waitlist-form"
                className="py-24 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-900/20 dark:via-gray-900 dark:to-purple-900/20"
            >
                <div className="container mx-auto max-w-2xl">
                    <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#017bde]/5 via-transparent to-[#017bde]/20"></div>
                        <div className="relative p-2 md:p-8">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#017bde]/10 dark:bg-[#017bde]/30 rounded-full text-[#017bde] dark:text-blue-300 text-sm font-medium mb-6">
                                    <Star className="w-4 h-4" />
                                    Join The Movement
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                    Secure Your Spot
                                </h3>
                                <p className="text-xl text-gray-600 dark:text-gray-400">
                                    Be the first to know when we launch
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <Input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Full Name"
                                        className="w-full h-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-[#017bde] focus:border-[#017bde] dark:focus:border-[#017bde] text-lg rounded-xl"
                                    />
                                </div>

                                <div>
                                    <Select
                                        value={form.country}
                                        onValueChange={val => setForm({ ...form, country: val })}
                                    >
                                        <SelectTrigger className="w-full !h-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-regular rounded-xl">
                                            <SelectValue placeholder="Select Country" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 max-h-60 rounded-xl">
                                            {countries.map((country: string) => (
                                                <SelectItem
                                                    key={country}
                                                    value={country}
                                                    className="hover:bg-gray-100 dark:hover:bg-gray-700 text-base"
                                                >
                                                    {country}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        className="w-full h-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-[#017bde] focus:border-[#017bde] dark:focus:border-[#017bde] text-lg rounded-xl"
                                    />
                                </div>

                                <Button
                                    onClick={handleSubmit}
                                    className="w-full h-12 bg-gradient-to-r from-[#017bde] to-[#0056b3] hover:from-[#0056b3] hover:to-[#013d7a] text-white font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl rounded-xl"
                                >
                                    Join the Waitlist Today
                                    <ArrowRight className="ml-3 w-6 h-6" />
                                </Button>
                            </div>

                            {message && (
                                <div className="mt-8 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                                    <p className="text-green-800 dark:text-green-300 text-center font-semibold text-lg">
                                        {message}
                                    </p>
                                </div>
                            )}
                        </div>
                        <BorderBeam size={250} duration={12} delay={9} />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 px-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center flex flex-col items-center">
                        <div className="mb-8">
                            <Logo />
                        </div>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                <span className="text-lg">hello@theresidentcreator.com</span>
                            </div>
                            {/* <div className="flex gap-8">
                                <a
                                href="#"
                                className="hover:text-[#017bde] dark:hover:text-blue-400 transition-colors text-lg"
                                >
                                Privacy Policy
                                </a>
                                <a
                                href="#"
                                className="hover:text-[#017bde] dark:hover:text-blue-400 transition-colors text-lg"
                                >
                                Terms of Service
                                </a>
                                </div> */}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 my-8 text-lg">
                            © {new Date().getFullYear()} Resident Creator LLC. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
