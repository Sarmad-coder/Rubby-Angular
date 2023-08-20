import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { uniq, uniqBy } from 'lodash';
import { log } from 'console';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { CountryService } from 'src/app/services/country.service';

// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements AfterViewInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        grid: {
          display: false, // Remove horizontal grid lines
        },
      },
      y: {
        min: 0,
        grid: {
          display: false, // Remove vertical grid lines
        },
        // ticks: {
        //  maxTicksLimit:6
        // }
      }
    },
    plugins: {
      legend: {
        display: true,
      
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartType: ChartType = 'bar';

  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData1: ChartData<'bar'> = {
    labels: ['17/04/2023'],
    datasets: [
      { data: [65], label: 'Views for last 10 days' },
    ]
  };


  slug: any
  profile: any;
  totalViews: number = 0;
  countriesData: any[] = []

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private router: Router,
    private countryService: CountryService
    // private datePipe: DatePipe,
  ) { }

  async ngAfterViewInit() {


    this.slug = this.route.snapshot.params['slug'];
    if (this.slug) {
      this.profile = await this.profileService.GetProfileBySlug(this.slug)


      let date1 = uniqBy(this.profile.views, (x: any) => x.date)
      const data: number[] = [];
      const labels: string[] = [];
      let views = 0;
      let date: any = []
      let dateTesting = getlast7Days()
      for (const item of date1) {
        if (dateTesting.start_date.getTime() <= new Date(item.date).getTime() && new Date(item.date).getTime() <= dateTesting.end_date.getTime()) {

          date.push(item)
        }
      }

      for (let index = 0; index < date.length; index++) {
        views = 0;

        this.profile.views.forEach((item: any) => {
          if (item.date == date[index].date) {
            views += 1
          }
        })

        data.push(views)
        labels.push(date[index].date)


      }
      data.forEach((item) => {
        this.totalViews += item
      })
      console.log(this.totalViews)


      let dateRange: any[] = [];
      let viewRange: number[] = [];


      let currentDate = new Date(dateTesting.start_date);
      while (currentDate <= dateTesting.end_date) {
        dateRange.push(new Date(currentDate));
        viewRange.push(0)
        currentDate.setDate(currentDate.getDate() + 1);
      }
      for (let index = 0; index < dateRange.length; index++) {
        dateRange[index] = formatDate(dateRange[index], 'MM/dd/yyyy', 'en');

      }

      for (let index1 = 0; index1 < labels.length; index1++) {
        for (let index = 0; index < dateRange.length; index++) {
          if (dateRange[index] == formatDate(new Date(labels[index1]), 'MM/dd/yyyy', 'en')) {
            viewRange[index] = data[index1]

          }

        }
      }


      for (let index = 0; index < dateRange.length; index++) {
        dateRange[index] = formatDate(dateRange[index], 'MM/dd', 'en');

      }
      this.barChartData1.labels = dateRange;
      this.barChartData1.datasets[0].data = viewRange;
      this.chart?.update();



      function getlast7Days() {
        const end_date = new Date();
        const start_date = new Date();
        start_date.setDate(start_date.getDate() - 9);

        return { start_date, end_date };
      }


      // Country Chart code starts here 
      let viewData: any = []
      this.profile.views.forEach((item: any) => {

        const [key, value] = Object.entries(item.viewData)[1]; // In this case, each object has only one key-value pair
        viewData.push(value)
      })
      const countriesName = [...new Set(viewData)];
      console.log(countriesName)
      countriesName.forEach(async (item: any) => {

        const countryData: any = await this.countryService.getCountryDataByCode(item);
        if (countryData) {

          var countryViews = 0
          this.profile.views.forEach((item2: any) => {
            if (item == item2.viewData.country) {
              countryViews += 1
            }
          })
          console.log(countryViews)
          countryData[0].views = countryViews
          this.countriesData.push(countryData[0])
        }
      })





    }

  }



  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }


  showSetting() {
    this.router.navigate(["/"])
  }

}
