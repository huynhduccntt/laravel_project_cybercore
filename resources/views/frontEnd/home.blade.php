@extends('frontEnd.layout')
@section('content')
<!-- start Home Slider -->
<!-- end Home Slider -->
@include('frontEnd.includes.slider')
<!-- start Care Panel -->
<div class="container" style="position: relative;   top: -100px; ">
    <!-- Infor    -->
    @include('frontEnd.includes.info_home')
    <!-- Close Infor  -->
    <!-- Procedure    -->
    @include('frontEnd.includes.howido_home')
    <!-- Close Procedure  -->
    <div class="vc_row-full-width vc_clearfix"></div>
    <!--Model     -->
    <!-- Close Model     -->
    <div class="vc_row-full-width vc_clearfix"></div>
    <!-- Complete Project -->
    @include('frontEnd.includes.project_home')
    <!-- Close Project   -->
    <div class="vc_row-full-width vc_clearfix"></div>
    <!-- Count -->
    @include('frontEnd.includes.count_home')
    <!-- Close Count  -->
    <div class="vc_row-full-width vc_clearfix"></div>
    <!-- FeedBack -->
    @include('frontEnd.includes.feedback_home')
    <!-- Close FeedBack  -->
    <div class="vc_row-full-width vc_clearfix"></div>
    <!-- News -->
    @include('frontEnd.includes.news_home')
    <!-- Close News  -->
    <div class="vc_row-full-width vc_clearfix"></div>
    <!-- Store -->
    @include('frontEnd.includes.store_home') 
    <!-- Close Store  -->
    <div class="vc_row-full-width vc_clearfix"></div>
</div>
@endsection