export function drawDashedLine(ctx, x, y, x2, y2, da = [10, 5]) {
    let dx = x2 - x,
        dy = y2 - y,
        len = Math.sqrt(dx * dx + dy * dy),
        rot = Math.atan2(dy, dx),
        dc = da.length,
        di = 0,
        draw = true;

    ctx.save();
    ctx.translate(x, y);
    ctx.moveTo(0, 0);
    ctx.rotate(rot);
    ctx.lineCap = 'round';
    ctx.lineWidth = 4;
    ctx.strokeStyle = "yellow";

    x = 0;
    while (len > x) {
        x += da[di++ % dc];
        if (x > len) {
            x = len;
        }
        ctx[draw ? 'lineTo' : 'moveTo'](x, 0);
        ctx.stroke();
        draw = !draw;
    }

    ctx.restore();
}

export function drawDashedCircle(ctx,x, y, radius, color) {
    ctx.save();
    ctx.translate(x, y); //  Changing the center of rotation
    ctx.beginPath();
    ctx.arc(0, 0, radius * 2 / 3 + 4, 0, Math.PI / 30);
    ctx.strokeStyle = color || '#16C4CB';
    ctx.stroke();
    ctx.closePath();
    for (var i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.rotate(10 * Math.PI / 180);
        ctx.arc(0, 0, radius * 2 / 3 + 4, 0, Math.PI / 30);
        ctx.strokeStyle = color || '#16C4CB';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
    }
    ctx.restore();
}