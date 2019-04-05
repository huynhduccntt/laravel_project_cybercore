<?php

namespace App\Http\Controllers;

class FrontendHomeController extends Controller
{
    public function __construct()
    { }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function HomePage()
    {
        return view(
            "frontEnd.home"
        );
    }
    public function AboutPage()
    {
        return view(
            "frontEnd.aboutus"
        );
    }

    public function StoresPage()
    {
        return view(
            "frontEnd.stores"
        );
    }
    public function ProjectsPage()
    {
        return view(
            "frontEnd.projects"
        );
    }
    public function EventsPage()
    {
        return view(
            "frontEnd.events"
        );
    }
    public function ContactsPage()
    {
        return view(
            "frontEnd.contacts"
        );
    }
}
