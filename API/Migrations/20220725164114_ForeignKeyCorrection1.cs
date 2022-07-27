using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class ForeignKeyCorrection1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Periods_Intervals_IntervalId",
                table: "Periods");

            migrationBuilder.DropIndex(
                name: "IX_Periods_IntervalId",
                table: "Periods");

            migrationBuilder.DropColumn(
                name: "IntervalId",
                table: "Periods");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "IntervalId",
                table: "Periods",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Periods_IntervalId",
                table: "Periods",
                column: "IntervalId");

            migrationBuilder.AddForeignKey(
                name: "FK_Periods_Intervals_IntervalId",
                table: "Periods",
                column: "IntervalId",
                principalTable: "Intervals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
