import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
   

   
  const TABLE_HEAD = ["Item Name", "Current Stock", "Current Checkouts/Day", "Expected Days Till OUT OF STOCK"];
   

   
  export function AnalyticsTable({inventoryData}) {
    return (
      <Card className="h-full w-full">


        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}

                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventoryData.map(
                ({ itemName, stockAmount, checkouts_per_day, expectedDaysUntilDepletion, }, index) => {
                  const isLast = index === inventoryData.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={itemName}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {itemName}
                            </Typography>

                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {stockAmount}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {checkouts_per_day.toFixed(2)}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {expectedDaysUntilDepletion}
                          </Typography>
                        </div>
                      </td>
      
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>

      </Card>
    );
  }