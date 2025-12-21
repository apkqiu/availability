var rotation=0;function attach_imview(a){$(`<div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-fullscreen">
		<div class="modal-content">
			<div class="modal-header" style="height: 3rem">
				<span class="me-2">\u56FE\u7247\u67E5\u770B</span>
				<a href="" id="newtab" target="_blank" class="me-2" no-intercept="true">\u7528\u6D4F\u89C8\u5668\u67E5\u770B</a>
				<a href="" id="download" download class="me-2" no-intercept="true">\u4E0B\u8F7D</a>

				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-header" style="height: 1rem">
				<span class="me-1">\u7F29\u653E</span>
				<button class="btn" id="zoomIn">
					<i class="bi bi-zoom-in"></i>
				</button>
				<button class="btn" id="zoomOut">
					<i class="bi bi-zoom-out"></i>
				</button>
				<button class="btn" id="aspect">
					<i class="bi bi-aspect-ratio"></i>
				</button>
				<input type="range" min="20" max="500" value="100" class="form-range" id="zoom" style="width: 200px" class="me-1" />
				<span id="zoomValue" class="me-1"></span>
			</div>
			<div class="modal-header" style="height: 1rem">
				<span class="me-1">\u65CB\u8F6C</span>
				<button class="btn" id="rotateLeft">
					<i class="bi bi-arrow-counterclockwise"></i>
				</button>
				<button class="btn" id="rotateRight">
					<i class="bi bi-arrow-clockwise"></i>
				</button>
			</div>
			<div class="modal-body">
				<img id="image" src="" alt="" style="width: 100%; object-fit: contain" id="image" />
			</div>
		</div>
	</div>
</div>`).appendTo($("body"));function t(){$("#image").css("width",$("#zoom").val()+"%"),$("#zoomValue").text($("#zoom").val()+"%")}$("#zoom").on("change",t).on("input",t),$("#rotateLeft").click(function(){rotation-=90,$("#image").css("transform","rotate("+rotation+"deg)"),rotation<0&&(rotation+=360)}),$("#rotateRight").click(function(){rotation+=90,$("#image").css("transform","rotate("+rotation+"deg)"),rotation>=360&&(rotation-=360)}),$("#zoomIn").on("click",function(){$("#zoom").val(parseInt(parseInt($("#zoom").val())/10)*10+10),t()}),$("#zoomOut").on("click",function(){$("#zoom").val(parseInt(parseInt($("#zoom").val())/10)*10-10),t()}),$("#aspect").on("click",function(){$("#zoom").val(100),t()}),$(a+" img").click(function(){show_im($(this).attr("src"))})}function show_im(a){$("#image").attr("src",""),$("#image").attr("src",a),$("#newtab").attr("href",a),$("#download").attr("href",a),$("#imageModal").modal("show"),$("#zoom").val("100").trigger("input"),rotation=0,$("#image").css("transform","rotate(0deg)")}
