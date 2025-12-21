var rotation = 0;
function attach_imview(base_filter) {
    $(`<div class="modal fade" id="imageModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-fullscreen">
		<div class="modal-content">
			<div class="modal-header" style="height: 3rem">
				<span class="me-2">图片查看</span>
				<a href="" id="newtab" target="_blank" class="me-2" no-intercept="true">用浏览器查看</a>
				<a href="" id="download" download class="me-2" no-intercept="true">下载</a>

				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-header" style="height: 1rem">
				<span class="me-1">缩放</span>
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
				<span class="me-1">旋转</span>
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
</div>`).appendTo($("body"));

    function update_image_by_range() {
        $('#image').css('width', $('#zoom').val() + '%');
        $('#zoomValue').text($('#zoom').val() + '%');
    }
    $('#zoom').on('change', update_image_by_range).on('input', update_image_by_range);
    $('#rotateLeft').click(function () {
        rotation -= 90;
        $('#image').css('transform', "rotate("+rotation + 'deg)');
        if (rotation < 0) rotation += 360;
    });
    $('#rotateRight').click(function () {
        rotation += 90;
        $('#image').css('transform', "rotate("+rotation + 'deg)');
        if (rotation >= 360) rotation -= 360;
    });
    $('#zoomIn').on('click', function () {
        $('#zoom').val(parseInt(parseInt($('#zoom').val()) / 10) * 10 + 10);
        update_image_by_range();
    });
    $('#zoomOut').on('click', function () {
        $('#zoom').val(parseInt(parseInt($('#zoom').val()) / 10) * 10 - 10);
        update_image_by_range();
    });
    $('#aspect').on('click', function () {
        $('#zoom').val(100);
        update_image_by_range();
    });
    $(base_filter+' img').click(function () {
        show_im($(this).attr('src'))
    });
}

function show_im(url){
    $('#image').attr('src', "");
    $('#image').attr('src', url);
    $('#newtab').attr('href', url);
    $('#download').attr('href', url);
    $('#imageModal').modal('show');
    $('#zoom').val('100').trigger('input');
    rotation = 0;
    $('#image').css('transform', 'rotate(0deg)');
}