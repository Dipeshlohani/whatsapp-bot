class User {
  constructor(dTable) {
    this.dTable = dTable;
  }
  listUsers() {
    this.dTable = $("#datatable").DataTable({
      pageLength: 50,
      processing: true,
      pagination: true,
      bPagination: true,
      pagingType: "full_numbers",
      responsive: true,
      filter: true,
      sort: false,
      serverSide: true,
      searchDelay: 100,
      dom: "<'row'<'col-sm-12'tr>>" + "<'row'<'col-sm-4'i><'col-sm-8'<'float-right p-2'p>>>",
      ajax: {
        url: "/api/v1/user",
        method: "GET",
        dataFilter: data => {
          let json = JSON.parse(data);
          json.recordsTotal = json.total;
          json.recordsFiltered = json.total;
          console.log(json);
          return JSON.stringify(json);
        },
        data: function(d) {
          return $.extend(
            {},
            {
              start: d.start,
              limit: d.length,
              search: d.search
            }
          );
        }
      },
      columns: [
        {
          data: "name"
        },
        {
          data: "birth_moon_sign"
        },
        {
          data: "birth_moon_nakshatra"
        },
        {
          data: "gothra"
        },
        {
          data: null,
          class: "text-center",
          render: (d, type, row, meta) => {
            return `<button type="button" class="btn btn-info" title="Detail" onclick="window.location.replace('/user/${d._id}')">Detail </button>`;
          }
        }
      ]
    });
  }
}
