<?php
/**
 * Homepage
 *
Template Name: Homepage
 *
 * @file           page-homepage.php
 * @package        StrapPress
 * @author         Brad Williams
 * @author         Yellow Bridge Interactive
 * @copyright      2014 Yellow Bridge Interactive
 * @copyright      2011 - 2013 Brag Interactive
 * @license        license.txt
 * @version        Release: 3.0.0
 * @link           http://codex.wordpress.org/Theme_Development#Pages_.28page.php.29
 * @since          available since Release 1.0
 */
?>
<?php get_header(); ?>

<div class="container">


<?php if (have_posts()) : ?>

    <?php while (have_posts()) : the_post(); ?>
        <div class="jumbotron">
        <?php the_content(); ?>
        </div>
    <?php endwhile; ?>



</div>
<div id="middle-row">
    <div class="container">
        <div class="col-sm-4">
            <h1>Section 1</h1>
            <p>This is where content for section one goes!</p>
        </div>
        <div class="col-sm-4">
            <h1>Section 2</h1>
            <p>This is where content for section two goes!</p>
        </div>
        <div class="col-sm-4">
            <h1>Section 3</h1>
            <p>This is where content for section three goes!</p>
        </div>
    </div>
</div>

                <?php else : ?>

                    <article id="post-not-found" class="hentry clearfix">
                        <header>
                            <h1 class="title-404"><?php _e('404 &#8212; Fancy meeting you here!', 'responsive'); ?></h1>
                        </header>
                        <section>
                            <p><?php _e('Don&#39;t panic, we&#39;ll get through this together. Let&#39;s explore our options here.', 'responsive'); ?></p>
                        </section>
                        <footer>
                            <h6><?php _e( 'You can return', 'responsive' ); ?> <a href="<?php echo home_url(); ?>/" title="<?php esc_attr_e( 'Home', 'responsive' ); ?>"><?php _e( '&#9166; Home', 'responsive' ); ?></a> <?php _e( 'or search for the page you were looking for', 'responsive' ); ?></h6>
                            <?php get_search_form(); ?>
                        </footer>
                    </article>

                <?php endif; ?>

<?php get_footer(); ?>