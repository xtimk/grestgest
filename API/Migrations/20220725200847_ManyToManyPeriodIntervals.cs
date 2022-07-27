using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class ManyToManyPeriodIntervals : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Intervals_Periods_PeriodId",
                table: "Intervals");

            migrationBuilder.DropIndex(
                name: "IX_Intervals_PeriodId",
                table: "Intervals");

            migrationBuilder.DropColumn(
                name: "PeriodId",
                table: "Intervals");

            migrationBuilder.AlterColumn<TimeOnly>(
                name: "StartingTime",
                table: "Intervals",
                type: "TEXT",
                nullable: false,
                defaultValue: new System.TimeOnly(0, 0, 0),
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<TimeOnly>(
                name: "EndingTime",
                table: "Intervals",
                type: "TEXT",
                nullable: false,
                defaultValue: new System.TimeOnly(0, 0, 0),
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "IntervalPeriod",
                columns: table => new
                {
                    IntervalsId = table.Column<int>(type: "INTEGER", nullable: false),
                    PeriodsId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IntervalPeriod", x => new { x.IntervalsId, x.PeriodsId });
                    table.ForeignKey(
                        name: "FK_IntervalPeriod_Intervals_IntervalsId",
                        column: x => x.IntervalsId,
                        principalTable: "Intervals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IntervalPeriod_Periods_PeriodsId",
                        column: x => x.PeriodsId,
                        principalTable: "Periods",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_IntervalPeriod_PeriodsId",
                table: "IntervalPeriod",
                column: "PeriodsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IntervalPeriod");

            migrationBuilder.AlterColumn<string>(
                name: "StartingTime",
                table: "Intervals",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(TimeOnly),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "EndingTime",
                table: "Intervals",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(TimeOnly),
                oldType: "TEXT");

            migrationBuilder.AddColumn<int>(
                name: "PeriodId",
                table: "Intervals",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Intervals_PeriodId",
                table: "Intervals",
                column: "PeriodId");

            migrationBuilder.AddForeignKey(
                name: "FK_Intervals_Periods_PeriodId",
                table: "Intervals",
                column: "PeriodId",
                principalTable: "Periods",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
