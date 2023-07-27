<div class="container"><slot/></div>
<style>
    /* bootstrap-like container */
    .container {
        margin-left: auto;
        margin-right: auto;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 15px;
        max-width: 1140px;
    }
    @media (min-width: 576px) {
        .container {
            max-width: 540px;
        }
    }
    @media (min-width: 768px) {
        .container {
            max-width: 720px;
        }
    }
    @media (min-width: 992px) {
        .container {
            max-width: 960px;
        }
    }
    @media (min-width: 1200px) {
        .container {
            max-width: 1140px;
        }
    }
</style>