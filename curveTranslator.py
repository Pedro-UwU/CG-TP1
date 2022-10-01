def main():
    curve = 'M1,1 C1,2 -1,2 -1,1 L-1,-1 C-1,-2 1,-2 1,-1 L1,1'
    commands = curve.split(' ')
    controls = []
    scale = 4
    print(commands)
    for command in commands:
        if command.startswith("M"):
            numbers = [float(x)/scale for x in command[1:].split(',')]
            print(f"shape.moveTo({numbers[0]},{numbers[1]})")
        elif command.startswith("L"):
            numbers = [float(x)/scale for x in command[1:].split(',')]
            print(f'shape.lineTo({numbers[0]},{numbers[1]})')
        elif command.startswith("C"):
            numbers = [float(x)/scale for x in command[1:].split(',')]
            controls = []
            controls.append(numbers[0])
            controls.append(numbers[1])
        else:
            numbers = [float(x)/scale for x in command.split(',')]
            controls.append(numbers[0])
            controls.append(numbers[1])
            if (len(controls) == 6):
                print(f'shape.bezierCurveTo({controls[0]},{controls[1]},{controls[2]},{controls[3]},{controls[4]},{controls[5]})')



if __name__ == "__main__":
    main()