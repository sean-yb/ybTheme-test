<?php
/**
 * Footer Template
 *
 *
 * @file           footer.php
 * @package        StrapPress
 * @author         Brad Williams
 * @author         Yellow Bridge Interactive
 * @copyright      2014 Yellow Bridge Interactive
 * @copyright      2011 - 2013 Brag Interactive
 * @license        license.txt
 * @version        Release: 3.0.0
 * @link           http://codex.wordpress.org/Theme_Development#Footer_.28footer.php.29
 * @since          available since Release 1.0
 *
 */
?>



<footer id="footer" class="clearfix">

    <div class="container">

            <?php wp_nav_menu( array('menu'=>'Footer')); ?>

    </div>

</footer>

<?php wp_footer(); // This is important! Without it, many plugins will not work. Make sure this is always immediately before the /body tag. ?>
</body>
</html>