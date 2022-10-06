4:30 am

<div class="grid md:grid-cols-6 grid-cols-1 gap-1 m-1">
  <div>1</div>
  <div class="col-span-4">2 - 5</div>
  <div>6</div>
</div>
     


      <div class="">
              <div class="header_widgets" style="margin-top: -20px;">
                  <!-- === CART - START === -->
                  <%- include('../includes/header_cart/index.ejs') %>
                  <!-- === CART - END === -->

                  <!-- === NOTIFICATIONS - START === -->
                  <%- include('../includes/header_notif/index.ejs') %>
                  <!-- === NOTIFICATIONS - END === -->

                  <!-- === MESSAGES - START === -->
                  <%- include('../includes/header_message/index.ejs') %>
                  <!-- === MESSAGES - END === -->

                  <!-- === AVATAR - START === -->
                  <%- include('../includes/header_avatar/index.ejs') %>
                  <!-- === AVATAR - END === -->
              </div>
            </div>