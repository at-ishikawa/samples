<?php

$start_time = floor($_REQUEST['start_time']);
// phpinfo();

?>
<html>
  <body>
    <div id="start_time" style="display: none;"><?= $start_time ?></div>
    <div id="time"></div>
    <form id="form" method="post" action="benchmark_upload.php" enctype="multipart/form-data">
      <input id="file" type="file" name="file" />
      <input id="startTime" type="hidden" name="start_time" value="john" />
      <input type="submit" name="submit" value="submit" />
    </form>

    <script type="text/javascript">
      document.addEventListener("DOMContentLoaded", function () {
          var start = document.querySelector("#start_time");
          if (start.innerText != "") {
              var end = new Date().getTime();
              var duration = (end - start.innerText);
              console.log({
                      start: start.innerText,
                     end: end,
                      duration: duration
                     });
          }

        var file = document.querySelector("#file");
        file.addEventListener('change', function() {
          if (!this.files.length) {
            return;
          }

          var filePath = this.files[0];
          console.log(filePath);
        });

        document.querySelector("#form").addEventListener("submit", () => {
          var startTime = new Date().getTime();

          document.querySelector("#startTime").value = startTime;
          return true;
        });
      });
    </script>
  </body>
</html>
