<!DOCTYPE html>
<html lang="vi">
<head>
    @include('frontEnd.includes.head')
    @include('frontEnd.includes.colors')
</head>

<body class="frontpage">
    <div id="wrapper">
        <!-- start header -->
        @include('frontEnd.includes.header')
        <!-- end header -->
        <!-- Content Section -->
        @yield('content')
        <!-- end of Content Section -->
        <!-- start footer -->
        @include('frontEnd.includes.footer')
        <!-- end footer -->
    </div>
    @include('frontEnd.includes.foot')

</body>

</html>