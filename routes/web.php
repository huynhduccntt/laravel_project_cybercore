<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Frontend Routes
// ../site map
Route::get('/sitemap.xml', 'SiteMapController@siteMap')->name('siteMap');

Route::get('/', 'FrontendHomeController@HomePage')->name('Home');

Route::get('/about-us', 'FrontendHomeController@AboutPage')->name('aboutPage');

Route::get('/stores', 'FrontendHomeController@StoresPage')->name('storesPage');

Route::get('/projects', 'FrontendHomeController@ProjectsPage')->name('projectsPage');

Route::get('/events', 'FrontendHomeController@EventsPage')->name('eventsPage');

Route::get('/contact-us', 'FrontendHomeController@ContactsPage')->name('contactsPage');

Route::get('sayhello/{name}', function ($name) {
	echo 'Hello Laravel! I am ' . $name;
});
