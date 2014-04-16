<?php
/**
 * Header Template
 *
 *
 * @file           header.php
 * @package        StrapPress
 * @author         Brad Williams
 * @author         Yellow Bridge Interactive
 * @copyright      2014 Yellow Bridge Interactive
 * @copyright      2011 - 2013 Brag Interactive
 * @license        license.txt
 * @version        Release: 3.0.0
 * @link           http://codex.wordpress.org/Theme_Development#Document_Head_.28header.php.29
 * @since          available since Release 1.0
 */
?>
<!doctype html>
<!--[if lt IE 7 ]>
<html class="no-js ie6" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7 ]>
<html class="no-js ie7" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8 ]>
<html class="no-js ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html class="no-js" <?php language_attributes(); ?>> <!--<![endif]-->
<head>

    <script type="text/javascript">
        var templateURL = '<?php get_template_directory_uri();?>';
    </script>

    <meta charset="<?php bloginfo('charset'); ?>"/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title><?php wp_title('&#124;', true, 'right'); ?><?php bloginfo('name'); ?></title>
    <?php if (bi_get_data('custom_favicon') !== '') : ?>
        <link rel="icon" type="image/png" href="<?php echo bi_get_data('custom_favicon'); ?>"/>
    <?php endif; ?>

    <link rel="profile" href="http://gmpg.org/xfn/11"/>
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>"/>

    <!--[if IE 7]>
    <link rel="stylesheet" href="<?php get_template_directory_uri();?>/css/font-awesome-ie7.min.css">
    <![endif]-->

    <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

<header>
    <div class="container">
        <div class="col-sm-4 col-xm-12">
            <h1>Testing</h1>
        </div>
        <div class="col-sm-6 col-xm-12 ">
            <h1>Test Col</h1>
        </div>
    </div>
   <div id="nav-container">
        <div class="container">
            <nav role="navigation">
                <div class="navbar navbar-default <?php if (bi_get_data('disable_inverse_navbar', '1') == '1') echo 'navbar-inverse'; ?> <?php if (bi_get_data('disable_fixed_navbar', '1') == '1') echo 'navbar-fixed-top'; ?>">
                <!-- .navbar-toggle is used as the toggle for collapsed navbar content -->
                <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse"
                                data-target=".navbar-responsive-collapse">
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>

                        <div class="navbar-collapse collapse navbar-responsive-collapse">
                            <?php

                            wp_nav_menu( array('menu'=>'Main Menu'));

                            ?>


                        </div><!-- nav bar collapse -->
                    </div><!-- navbar-header -->
                </div><!-- navbar -->
            </nav><!-- nav -->
        </div><!-- container -->
    </div><!-- nav-container-->
</header><!-- end of header -->


