import { Graphics } from "pixi.js";

type Point = { x: number; y: number };
type Line = { startingNode: Point; endNode: Point };
type Shape = { edges: Line[] };

/** Plan containing lines, rooms, etc */
export class Blueprint extends Graphics {
  /** Lines Drawed */
  lines: Line[] = [];
  // lines: Line[] = [
  //   { startingNode: { x: 600, y: 480 }, endNode: { x: 600, y: 240 } },
  //   { startingNode: { x: 740, y: 480 }, endNode: { x: 600, y: 480 } },
  //   { startingNode: { x: 600, y: 240 }, endNode: { x: 740, y: 480 } },
  //   { startingNode: { x: 740, y: 240 }, endNode: { x: 600, y: 240 } },
  //   { startingNode: { x: 740, y: 480 }, endNode: { x: 740, y: 240 } },
  // ];

  /** Lines Drawed */
  rooms: Shape[] = [];

  constructor() {
    super();
    // console.log(this.findRooms());
  }

  // public findRooms(corners: Corner[]): Corner[][] {

  //   function _calculateTheta(previousCorner: Corner, currentCorner: Corner, nextCorner: Corner) {
  //     var theta = Core.Utils.angle2pi(
  //       previousCorner.x - currentCorner.x,
  //       previousCorner.y - currentCorner.y,
  //       nextCorner.x - currentCorner.x,
  //       nextCorner.y - currentCorner.y);
  //     return theta;
  //   }

  //   function _removeDuplicateRooms(roomArray: Corner[][]): Corner[][] {
  //     var results: Corner[][] = [];
  //     var lookup = {};
  //     var hashFunc = function (corner) {
  //       return corner.id
  //     };
  //     var sep = '-';
  //     for (var i = 0; i < roomArray.length; i++) {
  //       // rooms are cycles, shift it around to check uniqueness
  //       var add = true;
  //       var room = roomArray[i];
  //       for (var j = 0; j < room.length; j++) {
  //         var roomShift = Core.Utils.cycle(room, j);
  //         var str = Core.Utils.map(roomShift, hashFunc).join(sep);
  //         if (lookup.hasOwnProperty(str)) {
  //           add = false;
  //         }
  //       }
  //       if (add) {
  //         results.push(roomArray[i]);
  //         lookup[str] = true;
  //       }
  //     }
  //     return results;
  //   }

  //   function _findTightestCycle(firstCorner: Corner, secondCorner: Corner): Corner[] {
  //     var stack: {
  //       corner: Corner,
  //       previousCorners: Corner[]
  //     }[] = [];

  //     var next = {
  //       corner: secondCorner,
  //       previousCorners: [firstCorner]
  //     };
  //     var visited = {};
  //     visited[firstCorner.id] = true;

  //     while (next) {
  //       // update previous corners, current corner, and visited corners
  //       var currentCorner = next.corner;
  //       visited[currentCorner.id] = true;

  //       // did we make it back to the startCorner?
  //       if (next.corner === firstCorner && currentCorner !== secondCorner) {
  //         return next.previousCorners;
  //       }

  //       var addToStack: Corner[] = [];
  //       var adjacentCorners = next.corner.adjacentCorners();
  //       for (var i = 0; i < adjacentCorners.length; i++) {
  //         var nextCorner = adjacentCorners[i];

  //         // is this where we came from?
  //         // give an exception if its the first corner and we aren't at the second corner
  //         if (nextCorner.id in visited &&
  //           !(nextCorner === firstCorner && currentCorner !== secondCorner)) {
  //           continue;
  //         }

  //         // nope, throw it on the queue  
  //         addToStack.push(nextCorner);
  //       }

  //       var previousCorners = next.previousCorners.slice(0);
  //       previousCorners.push(currentCorner);
  //       if (addToStack.length > 1) {
  //         // visit the ones with smallest theta first
  //         var previousCorner = next.previousCorners[next.previousCorners.length - 1];
  //         addToStack.sort(function (a, b) {
  //           return (_calculateTheta(previousCorner, currentCorner, b) -
  //             _calculateTheta(previousCorner, currentCorner, a));
  //         });
  //       }

  //       if (addToStack.length > 0) {
  //         // add to the stack
  //         addToStack.forEach((corner) => {
  //           stack.push({
  //             corner: corner,
  //             previousCorners: previousCorners
  //           });
  //         });
  //       }

  //       // pop off the next one
  //       next = stack.pop();
  //     }
  //     return [];
  //   }

  //   // find tightest loops, for each corner, for each adjacent
  //   // TODO: optimize this, only check corners with > 2 adjacents, or isolated cycles
  //   var loops: Corner[][] = [];

  //   corners.forEach((firstCorner) => {
  //     firstCorner.adjacentCorners().forEach((secondCorner) => {
  //       loops.push(_findTightestCycle(firstCorner, secondCorner));
  //     });
  //   });

  //   // remove duplicates
  //   var uniqueLoops = _removeDuplicateRooms(loops);
  //   //remove CW loops
  //   var uniqueCCWLoops = Core.Utils.removeIf(uniqueLoops, Core.Utils.isClockwise);

  //   return uniqueCCWLoops;
  // }
}